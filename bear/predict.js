// Select DOM elements
const photo = document.getElementById('photo');
const results = document.getElementById('results');

async function predict(file) {
  // Use CDN instead of a local import('@gradio/client')
  const { Client } = await import('https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js');

  const client = await Client.connect("danielmartinec/minima");
  const response = await client.predict("/predict", { 
    im: file,
  });

  const label = response.data[0]['confidences'][0]['label'];
  
  // Create a URL for display (since we're not using FileReader)
  const imageUrl = URL.createObjectURL(file);

  results.innerHTML = `<br/><img src="${imageUrl}" width="300"> <p>${label}</p>`;
}

photo.addEventListener('input', () => {
  const file = photo.files[0];
  if (file) {
    predict(file);
  }
});
