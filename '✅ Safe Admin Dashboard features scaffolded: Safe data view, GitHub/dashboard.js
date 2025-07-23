document.getElementById("dashboard").innerHTML = "<p>Loading Safe data...</p>";
fetch(config.safeApiUrl)
    .then(res => res.json())
    .then(data => {
        document.getElementById("dashboard").innerHTML = "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
    });