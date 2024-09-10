// Data type for Weather Data
interface WeatherData {
    temperature: number;
    condition: string;
}

// 1. Creational Design Pattern: Factory Pattern
interface WeatherDisplay {
    update(data: WeatherData): void;
}

class SunnyDisplay implements WeatherDisplay {
    update(data: WeatherData) {
        console.log(`Sunny Display: It's ${data.temperature}°C and sunny!`);
    }
}

class RainyDisplay implements WeatherDisplay {
    update(data: WeatherData) {
        console.log(`Rainy Display: It's ${data.temperature}°C and rainy!`);
    }
}

class WeatherDisplayFactory {
    static createDisplay(condition: string): WeatherDisplay {
        switch (condition) {
            case 'Sunny':
                return new SunnyDisplay();
            case 'Rainy':
                return new RainyDisplay();
            default:
                throw new Error('Unknown weather condition');
        }
    }
}

// 2. Behavioral Design Pattern: Observer Pattern
interface Observer {
    update(data: WeatherData): void;
}

class WeatherStation {
    private observers: Observer[] = [];

    addObserver(observer: Observer) {
        this.observers.push(observer);
    }

    removeObserver(observer: Observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(data: WeatherData) {
        this.observers.forEach(observer => observer.update(data));
    }

    // Simulate fetching new weather data
    fetchWeatherData() {
        const data: WeatherData = {
            temperature: Math.random() * 30 + 10, // Random temperature between 10 and 40
            condition: Math.random() > 0.5 ? 'Sunny' : 'Rainy'  // Random condition
        };
        console.log("Weather fetched:", data);
        this.notifyObservers(data);
    }
}

// 3. Structural Design Pattern: Adapter Pattern
// Simulate the old weather system providing data in a different format
class OldWeatherSystem {
    getOldWeatherData(): { tempInFahrenheit: number; weatherType: string } {
        return {
            tempInFahrenheit: Math.random() * 50 + 50,  // Temperature in Fahrenheit
            weatherType: Math.random() > 0.5 ? 'Clear' : 'Wet'  // Old naming conventions
        };
    }
}

// Adapter to convert old weather data format to the new format
class WeatherAdapter implements WeatherDisplay {
    private oldSystem: OldWeatherSystem;

    constructor(oldSystem: OldWeatherSystem) {
        this.oldSystem = oldSystem;
    }

    update(data: WeatherData) {
        const oldData = this.oldSystem.getOldWeatherData();
        const convertedData: WeatherData = {
            temperature: (oldData.tempInFahrenheit - 32) * (5 / 9),  // Convert F to C
            condition: oldData.weatherType === 'Clear' ? 'Sunny' : 'Rainy'
        };
        console.log(`Adapter Display: Converted Old Weather Data -> Temp: ${convertedData.temperature.toFixed(2)}°C, Condition: ${convertedData.condition}`);
    }
}

// Simulate the execution
const weatherStation = new WeatherStation();  // This will be our weather data source

// Create displays dynamically using Factory (Creational)
const sunnyDisplay = WeatherDisplayFactory.createDisplay('Sunny');
const rainyDisplay = WeatherDisplayFactory.createDisplay('Rainy');

// Add these displays to the weather station as observers (Behavioral)
weatherStation.addObserver(sunnyDisplay);
weatherStation.addObserver(rainyDisplay);

// Adapter for the old weather system (Structural)
const oldWeatherSystem = new OldWeatherSystem();
const weatherAdapter = new WeatherAdapter(oldWeatherSystem);
weatherStation.addObserver(weatherAdapter);  // Add the adapter as an observer

// Fetch new weather data and notify all displays (including adapter)
weatherStation.fetchWeatherData();
