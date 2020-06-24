import { illusioDB } from "helper/database";

/**
 * Resize the given base64 encoded image data URI.
 *
 * @param {String} inputData - the base64 encoded image data URI.
 * @param {Number} targetWidth - the desired width of the final image.
 * @param {Number} targetHeight - the desired height of the final image.
 * @returns {String} the base64 encoded data URI for the resized image.
 */
async function _resizeDataUrl(inputData, targetWidth, targetHeight) {
  return new Promise((resolve, reject) => {
    // Create an off-screen image element for manipulating the image.
    var offScreenImg = new Image();

    // Define the processing function: it will execute as soon as we
    // add an input to the image element.
    offScreenImg.onload = () => {
      // Compute the scaling factor to keep the same image ratio.
      var scalingFactor =
        offScreenImg.width < targetWidth
          ? targetWidth / offScreenImg.width
          : targetHeight / offScreenImg.height;

      // Compute the new sizes given the scaling factor.
      var scaledWidth = offScreenImg.width * scalingFactor;
      var scaledHeight = offScreenImg.height * scalingFactor;

      // Create a 'canvas' element to manipulate the image, make it
      // as big as the target image.
      var canvas = document.createElement("canvas");
      canvas.height = targetWidth;
      canvas.width = targetHeight;

      // Get the 2d rendering context to perform the resize.
      var context2d = canvas.getContext("2d");
      var xOffset = (targetWidth - scaledWidth) * 0.5;
      var yOffset = (targetHeight - scaledHeight) * 0.5;
      context2d.drawImage(
        offScreenImg,
        0,
        0,
        offScreenImg.width,
        offScreenImg.height,
        xOffset,
        yOffset,
        scaledWidth,
        scaledHeight
      );

      // Resolve the outer processing promise.
      return resolve(canvas.toDataURL());
    };

    // Make sure to propagate errors.
    offScreenImg.onerror = reject;

    // Trigger the resize.
    offScreenImg.src = inputData;
  });
}

/**
 * User profile information block.
 * @typedef {Object} ProfileInfo
 * @property {String} name - The name of the user.
 * @property {Number} age - The age of the user.
 * @property {Number} weightInKg - The weight of the user, in kilograms.
 * @property {Number} heightInCm - The height of the user, in centimeters.
 * @property {String} gender -  The gender of the user, either 'M' for male
 * or 'F' for female.
 * @property {String} canoeType - The canoe type, one of 'K1', 'C1' or 'C2'.
 */

const profilesAPI = {
  /**
   * Add a new user profile to the local database.
   *
   * @param {ProfileInfo} info - The information for the new  profile.
   * @param {String} base64Image - A base64 encoded image of the user profile. Please
   * note that this image will be resized to (144, 144) before saving it to the database.
   * @returns {Promise} that is resolved with the `id` of the newly created user or
   * rejected with an error.
   */
  async create(info, rawImage) {
    // First, resize the image.
    var resizedImage = await _resizeDataUrl(rawImage, 144, 144);

    // Deep copy hack.
    var userInfo = JSON.parse(JSON.stringify(info));
    userInfo.picture = resizedImage;

    return await illusioDB.profiles.add(userInfo);
  },

  /**
   * Get the profiles stored on the device.
   * @returns {Array<ProfileInfo>} an array of user profiles stored in the device.
   */
  async getProfiles() {
    return await illusioDB.profiles.toArray();
  },

  /**
   * Get the information for a specific profile stored on the device.
   * @param {Number} userId - the id of the user.
   * @returns {Promise} that is resolved with the `ProfileInfo` for the requested user
   * or rejected if user does not exist.
   */
  async getProfile(userId) {
    const profileInfo = await illusioDB.profiles.get({ id: userId });
    if (!profileInfo) {
      return Promise.reject();
    }

    return profileInfo;
  },

  /**
   * Delete a profile stored on the device.
   * @param {Number} userId - the id of the user.
   * @returns {Promise} that is resolved with when the operation is complete (whether or not
   * the profile was deleted) or rejected if the user does not exist.
   */
  async deleteProfile(userId) {
    const profileRow = await illusioDB.profiles.where({ id: userId });
    if (!profileRow) {
      return Promise.reject();
    }

    return profileRow.delete();
  },
};

export default profilesAPI;
