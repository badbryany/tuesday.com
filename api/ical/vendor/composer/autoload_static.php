<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit2808b000d6a1d3df9654a63cd6dbaa9e
{
    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'Spatie\\IcalendarGenerator\\' => 26,
            'Spatie\\Enum\\' => 12,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Spatie\\IcalendarGenerator\\' => 
        array (
            0 => __DIR__ . '/..' . '/spatie/icalendar-generator/src',
        ),
        'Spatie\\Enum\\' => 
        array (
            0 => __DIR__ . '/..' . '/spatie/enum/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit2808b000d6a1d3df9654a63cd6dbaa9e::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit2808b000d6a1d3df9654a63cd6dbaa9e::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
