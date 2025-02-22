let verses = [];

// Fetch the verses from the JSON file on load
fetch('bibles.json')
    .then(response => response.json())
    .then(data => {
        // Convert the data structure into a usable array
        verses = data.slice(1).map(verseEntry => {
            const location = verseEntry["Unnamed: 0"];
            const versions = Object.keys(verseEntry).filter(
                key => key !== "Unnamed: 0" && key !== "Unnamed: 4"
            );

            return {
                location: location,
                greek: verseEntry["Unnamed: 4"],
                versions: versions.map(version => ({
                    version: version,
                    name: data[0][version],
                    text: verseEntry[version],
                }))
            };
        });
        getRandomVerse(); // Display the first random verse
    })
    .catch(error => console.error('Error loading verses:', error));

// Function to get and display a random verse
function getRandomVerse() {
    if (!verses.length) {
        alert("No verses loaded yet!");
        return;
    }

    const randomVerse = verses[Math.floor(Math.random() * verses.length)];

    // Display the location
    document.getElementById('location').innerText = randomVerse.location;

    // Prepare the HTML content for the verse display
    let verseContent = '';
    randomVerse.versions.forEach(verseVersion => {
        verseContent += `
            <div class="version-name">${verseVersion.name}</div>
            <div class="verse">${verseVersion.text}</div>
        `;
    });

    // Set the inner HTML of the container to display all versions
    document.getElementById('versionAbbr').innerHTML = verseContent;
    document.getElementById('versionName').innerText = '';
    document.getElementById('verse').innerText = '';
    
}

// Add event listener to the body to trigger getRandomVerse on background click
document.body.addEventListener('click', (event) => {
    // Check if the click happened outside the container
    if (!document.getElementById('verseContainer').contains(event.target)) {
        getRandomVerse();
    }
});