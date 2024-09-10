var SunnyDisplay = /** @class */ (function () {
    function SunnyDisplay() {
    }
    SunnyDisplay.prototype.update = function (data) {
        console.log("Sunny Display: It's ".concat(data.temperature, "\u00B0C and sunny!"));
    };
    return SunnyDisplay;
}());
var RainyDisplay = /** @class */ (function () {
    function RainyDisplay() {
    }
    RainyDisplay.prototype.update = function (data) {
        console.log("Rainy Display: It's ".concat(data.temperature, "\u00B0C and rainy!"));
    };
    return RainyDisplay;
}());
var WeatherDisplayFactory = /** @class */ (function () {
    function WeatherDisplayFactory() {
    }
    WeatherDisplayFactory.createDisplay = function (condition) {
        switch (condition) {
            case 'Sunny':
                return new SunnyDisplay();
            case 'Rainy':
                return new RainyDisplay();
            default:
                throw new Error('Unknown weather condition');
        }
    };
    return WeatherDisplayFactory;
}());
var WeatherStation = /** @class */ (function () {
    function WeatherStation() {
        this.observers = [];
    }
    WeatherStation.prototype.addObserver = function (observer) {
        this.observers.push(observer);
    };
    WeatherStation.prototype.removeObserver = function (observer) {
        this.observers = this.observers.filter(function (obs) { return obs !== observer; });
    };
    WeatherStation.prototype.notifyObservers = function (data) {
        this.observers.forEach(function (observer) { return observer.update(data); });
    };
    // Simulate fetching new weather data
    WeatherStation.prototype.fetchWeatherData = function () {
        var data = {
            temperature: Math.random() * 30 + 10, // Random temperature between 10 and 40
            condition: Math.random() > 0.5 ? 'Sunny' : 'Rainy' // Random condition
        };
        console.log("Weather fetched:", data);
        this.notifyObservers(data);
    };
    return WeatherStation;
}());
// 3. Structural Design Pattern: Adapter Pattern
// Simulate the old weather system providing data in a different format
var OldWeatherSystem = /** @class */ (function () {
    function OldWeatherSystem() {
    }
    OldWeatherSystem.prototype.getOldWeatherData = function () {
        return {
            tempInFahrenheit: Math.random() * 50 + 50, // Temperature in Fahrenheit
            weatherType: Math.random() > 0.5 ? 'Clear' : 'Wet' // Old naming conventions
        };
    };
    return OldWeatherSystem;
}());
// Adapter to convert old weather data format to the new format
var WeatherAdapter = /** @class */ (function () {
    function WeatherAdapter(oldSystem) {
        this.oldSystem = oldSystem;
    }
    WeatherAdapter.prototype.update = function (data) {
        var oldData = this.oldSystem.getOldWeatherData();
        var convertedData = {
            temperature: (oldData.tempInFahrenheit - 32) * (5 / 9), // Convert F to C
            condition: oldData.weatherType === 'Clear' ? 'Sunny' : 'Rainy'
        };
        console.log("Adapter Display: Converted Old Weather Data -> Temp: ".concat(convertedData.temperature.toFixed(2), "\u00B0C, Condition: ").concat(convertedData.condition));
    };
    return WeatherAdapter;
}());
// Simulate the execution
var weatherStation = new WeatherStation(); // This will be our weather data source
// Create displays dynamically using Factory (Creational)
var sunnyDisplay = WeatherDisplayFactory.createDisplay('Sunny');
var rainyDisplay = WeatherDisplayFactory.createDisplay('Rainy');
// Add these displays to the weather station as observers (Behavioral)
weatherStation.addObserver(sunnyDisplay);
weatherStation.addObserver(rainyDisplay);
// Adapter for the old weather system (Structural)
var oldWeatherSystem = new OldWeatherSystem();
var weatherAdapter = new WeatherAdapter(oldWeatherSystem);
weatherStation.addObserver(weatherAdapter); // Add the adapter as an observer
// Fetch new weather data and notify all displays (including adapter)
weatherStation.fetchWeatherData();
