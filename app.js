console.log("v2");

// GitHub API Variables
const token = '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'; // Replace with your GitHub PAT
const owner = 'nguyentu96'; // Your GitHub username or organization
const repo = 'kbdrive'; // Your repository name
const path = 'uploaded-files'; // Path where the file will be uploaded
const message = 'Upload file via GitHub API'; // Commit message

// Function to handle file upload
function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    // Convert file to Base64
    const reader = new FileReader();
    reader.onloadend = function () {
        const base64Content = reader.result.split(',')[1]; // Extract base64 part
        const filename = `${Date.now()}-${file.name}`;

        // Call the GitHub API to upload the file
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}/${filename}`;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                content: base64Content,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.content) {
                console.log('File uploaded successfully:', data);
                alert('File uploaded successfully.');
            } else {
                console.error('Error uploading file:', data);
                alert('Error uploading file. Check console for details.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    reader.readAsDataURL(file); // Read the file as a data URL (Base64)
}
