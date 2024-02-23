export async function fetchImages(userInput) {
    const apiKey = '42524024-b4ed13b49ab793108dce16487';
    const response = await fetch(
        
      `https://pixabay.com/api/?key=${apiKey}&q=${userInput}&image_type=photo&orientation=horizontal&safesearch=true`
    );
  
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
  
    const data = await response.json();
    return data;
  }
  