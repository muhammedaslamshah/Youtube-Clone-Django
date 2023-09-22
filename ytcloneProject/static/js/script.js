 // Get the searchbar element
 const searchbar = document.querySelector('#searchbar');

 // Add an event listener to the searchbar element to listen for the "keyup" event
 searchbar.addEventListener('keyup', async function(event) {
   // Get the search query
   const searchQuery = searchbar.value;

   // Make a fetch request to the YouTube API
   try {
     const response = await fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchQuery + "&key=AIzaSyCPVsN4KrHghsyjPc9PwBsF8EUetwbVEnw");

     // Check the status of the response
     if (response.status !== 200) {
       throw new Error('Failed to fetch search results');
     }

     // Parse the JSON response
     const data = await response.json();

     // Display the search results in the content section
     const contentSection = document.querySelector('.content-section');
     contentSection.innerHTML = '';

     for (const result of data.items) {
       const videoTitle = result.snippet.title;
       const videoURL = 'https://www.youtube.com/watch?v=' + result.id.videoId;
       const videoThumbnail = result.snippet.thumbnails.default.url;

       const markup = `
         <div class="video">
           <a href='${videoURL}' target="_blank">
             <img src="${videoThumbnail}" alt="${videoTitle}">
             <p>${videoTitle}</p>
           </a>
         </div>`;

       contentSection.insertAdjacentHTML('beforeend', markup);
     }
   } catch (error) {
   }
 });