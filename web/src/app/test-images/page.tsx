"use client";

export default function TestImages() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Image Test Page</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Direct Image Test:</h2>
          <img 
            src="/images/ai-summarization.jpg" 
            alt="AI Summarization" 
            width="200" 
            height="150"
            onError={(e) => {
              console.log('Direct image failed to load');
              e.currentTarget.style.backgroundColor = 'red';
            }}
            onLoad={() => console.log('Direct image loaded successfully')}
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Project Images Test:</h2>
          <img 
            src="/images/spotify-clone.jpg" 
            alt="Spotify Clone" 
            width="200" 
            height="150"
            onError={(e) => {
              console.log('Spotify image failed to load');
              e.currentTarget.style.backgroundColor = 'red';
            }}
            onLoad={() => console.log('Spotify image loaded successfully')}
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Blog Images Test:</h2>
          <img 
            src="/images/blog/ai-future.jpg" 
            alt="AI Future" 
            width="200" 
            height="150"
            onError={(e) => {
              console.log('Blog image failed to load');
              e.currentTarget.style.backgroundColor = 'red';
            }}
            onLoad={() => console.log('Blog image loaded successfully')}
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Services Images Test:</h2>
          <img 
            src="/images/web-development.jpg" 
            alt="Web Development" 
            width="200" 
            height="150"
            onError={(e) => {
              console.log('Services image failed to load');
              e.currentTarget.style.backgroundColor = 'red';
            }}
            onLoad={() => console.log('Services image loaded successfully')}
          />
        </div>
      </div>
    </div>
  );
}