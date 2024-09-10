# Weather Monitoring System

This project is a simple **TypeScript** implementation demonstrating three types of design patterns:

1. Creational Design Pattern**: Factory Pattern
2. Structural Design Pattern**: Adapter Pattern
3. Behavioral Design Pattern**: Observer Pattern

## Project Structure

- Creational Pattern: The `WeatherDisplayFactory` dynamically creates weather display objects (`SunnyDisplay`, `RainyDisplay`) based on the current weather condition.
- Structural Pattern**: The `WeatherAdapter` converts data from an old weather system (providing weather data in Fahrenheit and different naming conventions) into the new system's format.
- Behavioral Pattern: The `Observer Pattern` is implemented where `WeatherStation` notifies multiple displays when new weather data is fetched.

## Getting Started

### Prerequisites

You need to have Node.js and npm installed. You can download them from [here](https://nodejs.org/).

After that, install TypeScript globally:

```bash
npm install -g typescript

