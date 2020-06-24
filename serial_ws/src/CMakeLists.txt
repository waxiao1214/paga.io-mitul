project(serial2ws)

list(APPEND CMAKE_MODULE_PATH ${CMAKE_SOURCE_DIR}/cmake)

# Dependencies.
set(Boost_USE_MULTITHREADED ON)
find_package(Boost 1.62 REQUIRED thread system)

if(Boost_FOUND)
    include_directories(${Boost_INCLUDE_DIRS})
endif()

find_package(OpenSSL REQUIRED crypto)
if (OpenSSL_FOUND)
    include_directories(${OPENSSL_INCLUDE_DIR})
endif()

find_package(pigpio REQUIRED)
if (pigpio_FOUND)
    include_directories(${pigpio_INCLUDES})
endif()

# All sources that also need to be tested in unit tests go into a static library
#add_library(serial2ws_lib STATIC hello.cpp hello.h)
#target_include_directories(serial2ws_lib PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})

get_filename_component(PARENT_DIR ${CMAKE_CURRENT_SOURCE_DIR} DIRECTORY)
include_directories(${PARENT_DIR}/libs/simple-ws-server)

# The main program
add_executable(serial2ws main.cpp)
if(Boost_FOUND)
    target_link_libraries(serial2ws ${Boost_LIBRARIES})
endif()
if(OpenSSL_FOUND)
    target_link_libraries(serial2ws ${OPENSSL_LIBRARIES})
endif()
if (pigpio_FOUND)
    target_link_libraries(serial2ws ${pigpio_LIBRARY})
endif()