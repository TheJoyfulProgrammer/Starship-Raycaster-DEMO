cmake_minimum_required(VERSION 3.21)
project(Starship_Raycaster LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 26)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Vulkan REQUIRED)
find_package(SDL3 REQUIRED CONFIG)

# ---- FreeType (required) ----
find_package(Freetype REQUIRED)
add_compile_definitions(STAR_USE_FREETYPE=1)


add_executable(Starship_Raycaster
    src/main.cpp
    src/Starship_Raycaster.hpp
    src/Starship_Raycaster.cpp
    src/star_shipgen.hpp
    src/star_shipgen.cpp
    src/star_palette.hpp
    src/star_palette.cpp
)

target_link_libraries(Starship_Raycaster PRIVATE Vulkan::Vulkan SDL3::SDL3)

# Link FreeType (required)
if (TARGET Freetype::Freetype)
    target_link_libraries(Starship_Raycaster PRIVATE Freetype::Freetype)
else()
    target_include_directories(Starship_Raycaster PRIVATE ${FREETYPE_INCLUDE_DIRS})
    target_link_libraries(Starship_Raycaster PRIVATE ${FREETYPE_LIBRARIES})
endif()

# ---- Shader build (glslc -> SPIR-V) ----
# Cache and normalize glslc path to avoid Ninja/CMake regeneration loops on Windows/MSYS2.
if (NOT DEFINED GLSLC_EXECUTABLE OR GLSLC_EXECUTABLE STREQUAL "")
    if (DEFINED Vulkan_GLSLC_EXECUTABLE AND EXISTS "${Vulkan_GLSLC_EXECUTABLE}")
        set(_glslc_raw "${Vulkan_GLSLC_EXECUTABLE}")
    else()
        find_program(_glslc_raw NAMES glslc)
    endif()

    if (NOT _glslc_raw)
        message(FATAL_ERROR "glslc not found. Install Vulkan SDK tools or ensure glslc is in PATH.")
    endif()

    file(TO_CMAKE_PATH "${_glslc_raw}" _glslc_norm)
    set(GLSLC_EXECUTABLE "${_glslc_norm}" CACHE FILEPATH "Path to glslc" FORCE)
endif()

if (NOT EXISTS "${GLSLC_EXECUTABLE}")
    message(FATAL_ERROR "glslc not found at: ${GLSLC_EXECUTABLE}")
endif()

set(SHADER_SRC_DIR "${CMAKE_SOURCE_DIR}/shaders")
set(SHADER_BIN_DIR "${CMAKE_BINARY_DIR}/shaders")

# Compile every shader we find under /shaders (vert/frag/comp).
#
# Important:
# - We intentionally do NOT use CONFIGURE_DEPENDS here because some Ninja +
#   filesystem combinations can cause repeated (infinite) CMake regeneration.
# - If you add/remove shader files, re-run CMake (or delete build/ and rebuild).
# - Sort the list so generated build files are deterministic.
file(GLOB_RECURSE SHADERS
    RELATIVE "${SHADER_SRC_DIR}"
    "${SHADER_SRC_DIR}/*.vert"
    "${SHADER_SRC_DIR}/*.frag"
    "${SHADER_SRC_DIR}/*.comp"
)
list(SORT SHADERS)

set(SPIRV_OUTPUTS "")
foreach(SHADER_REL IN LISTS SHADERS)
    set(SHADER "${SHADER_SRC_DIR}/${SHADER_REL}")
    set(OUT_SPV "${SHADER_BIN_DIR}/${SHADER_REL}.spv")
    get_filename_component(OUT_DIR "${OUT_SPV}" DIRECTORY)

    add_custom_command(
        OUTPUT "${OUT_SPV}"
        COMMAND "${CMAKE_COMMAND}" -E make_directory "${OUT_DIR}"
        COMMAND "${GLSLC_EXECUTABLE}" -O "${SHADER}" -o "${OUT_SPV}"
        DEPENDS "${SHADER}"
        COMMENT "Compiling ${SHADER_REL} -> ${OUT_SPV}"
        VERBATIM
    )
    list(APPEND SPIRV_OUTPUTS "${OUT_SPV}")
endforeach()

add_custom_target(star_shaders ALL DEPENDS ${SPIRV_OUTPUTS})
add_dependencies(Starship_Raycaster star_shaders)