<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection details
$serverName = "sql113.infinityfree.com";  
$userName = "if0_38267992";  
$password = "54wDbaQT1VBkxSA";  
$databaseName = "if0_38267992_weather";  

$conn = mysqli_connect($serverName, $userName, $password, $databaseName);
if (!$conn) {
    die(json_encode(['error' => 'Database connection failed: ' . mysqli_connect_error()]));
}

$apiKey = "7033f74efae0ec99e636a11b35892ffc";
$cityName = $_GET['city'] ?? 'Demopolis';

// Fetch API Data
function fetchData($url) {
    $response = @file_get_contents($url);
    if ($response === false) {
        return null;
    }

    $data = json_decode($response, true);
    if (!$data || !isset($data['cod']) || $data['cod'] != 200) {
        return null;
    }
    return $data;
}

$currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" . urlencode($cityName) . "&appid=$apiKey&units=metric";
$forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" . urlencode($cityName) . "&appid=$apiKey&units=metric";

$currentWeatherData = fetchData($currentWeatherUrl);
$forecastData = fetchData($forecastUrl);

if (!$currentWeatherData) {
    echo json_encode(['error' => 'City not found or API request failed']);
    exit;
}

// Extract Weather Data and Round Values
$weather = [
    'cityName' => $currentWeatherData['name'],
    'country' => $currentWeatherData['sys']['country'],
    'temperature' => round($currentWeatherData['main']['temp']),
    'weatherDesc' => $currentWeatherData['weather'][0]['description'],
    'icon' => $currentWeatherData['weather'][0]['icon'],
    'feelsLike' => round($currentWeatherData['main']['feels_like']),
    'pressure' => round($currentWeatherData['main']['pressure']),
    'humidity' => round($currentWeatherData['main']['humidity']),
    'windSpeed' => round($currentWeatherData['wind']['speed']),
    'visibility' => isset($currentWeatherData['visibility']) ? round($currentWeatherData['visibility'] / 1000) : null,
    'cloudCover' => round($currentWeatherData['clouds']['all']),
    'sunRise' => $currentWeatherData['sys']['sunrise'],
    'sunSet' => $currentWeatherData['sys']['sunset']
];

// Insert Weather Data into Database
$insertWeather = "INSERT INTO weather_data (city_name, country, temperature, weather_desc, icon, feels_like, pressure, humidity, wind_speed, visibility, cloud_cover, sunrise, sunset)
VALUES (
    '{$weather['cityName']}',
    '{$weather['country']}',
    {$weather['temperature']},
    '{$weather['weatherDesc']}',
    '{$weather['icon']}',
    {$weather['feelsLike']},
    {$weather['pressure']},
    {$weather['humidity']},
    {$weather['windSpeed']},
    {$weather['visibility']},
    {$weather['cloudCover']},
    {$weather['sunRise']},
    {$weather['sunSet']}
)";

if (!mysqli_query($conn, $insertWeather)) {
    die(json_encode(['error' => 'Failed to insert weather data: ' . mysqli_error($conn)]));
}

// Prepare Response (Rounded Hourly Forecast)
$response = [
    'currentWeather' => $weather,
    'hourlyForecast' => isset($forecastData['list']) ? array_slice(array_map(function($hour) {
        return [
            'time' => $hour['dt'],
            'temperature' => round($hour['main']['temp']),
            'weatherDesc' => $hour['weather'][0]['description'],
            'icon' => $hour['weather'][0]['icon']
        ];
    }, $forecastData['list']), 0, 8) : []
];

echo json_encode($response);
?>
