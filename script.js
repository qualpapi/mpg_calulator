async function calculateCost() {
    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const userEfficiency = document.getElementById('userEfficiency').value;
    const distance = parseFloat(document.getElementById('distance').value);
    const fuelPrice = parseFloat(document.getElementById('fuelPrice').value);
  
    if (userEfficiency) {
      // Use user-provided fuel efficiency
      const fuelConsumption = distance / userEfficiency;
      const totalCost = fuelConsumption * fuelPrice;
      displayResult(totalCost);
    } else {
      // Fetch fuel efficiency from API
      const apiUrl = `https://www.fueleconomy.gov/fdms/fe1/fe1990.json?vehicleId=${brand}&model=${model}`;
  
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const fuelEfficiency = data.results[0].city08; // Adjust the property as needed
  
        if (!fuelEfficiency || fuelEfficiency === 0) {
          alert('Vehicle not found in the database. Please input your vehicle\'s fuel efficiency or try a different model.');
          return;
        }
  
        const fuelConsumption = distance / fuelEfficiency;
        const totalCost = fuelConsumption * fuelPrice;
        displayResult(totalCost);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching vehicle data. Please try again or input your vehicle\'s fuel efficiency.');
      }
    }
  }