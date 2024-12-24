let verses = [];

// Fetch the verses from the JSON file on load
fetch('bibles.json')
    .then(response => response.json())
    .then(data => {
        // Convert the data structure into a usable array
        verses = data.slice(1).map(verseEntry => {
            const location = verseEntry["Unnamed: 0"];
            const versions = Object.keys(verseEntry).filter(
                key => key !== "Unnamed: 0" && key
            );

            return versions.map(version => ({
                location: location,
                version: version,
                name: data[0][version],
                text: verseEntry[version],
            }));
        }).flat();
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

    document.getElementById('versionAbbr').innerText = randomVerse.version;
    document.getElementById('versionName').innerText = randomVerse.name;
    document.getElementById('location').innerText = randomVerse.location;
    document.getElementById('verse').innerText = randomVerse.text;
}
