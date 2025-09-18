export default function TestImages() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Image Test Page</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Logo Test:</h2>
          <img src="/logo.svg" alt="Logo" width="100" height="100" />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Project Images Test:</h2>
          <img src="/images/ai-summarization.jpg" alt="AI Summarization" width="200" height="150" />
          <img src="/images/spotify-clone.jpg" alt="Spotify Clone" width="200" height="150" />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Blog Images Test:</h2>
          <img src="/images/blog/ai-future.jpg" alt="AI Future" width="200" height="150" />
          <img src="/images/blog/spotify-clone.jpg" alt="Spotify Blog" width="200" height="150" />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Services Images Test:</h2>
          <img src="/images/web-development.jpg" alt="Web Development" width="200" height="150" />
          <img src="/images/ai-ml-solutions.jpg" alt="AI/ML Solutions" width="200" height="150" />
        </div>
      </div>
    </div>
  );
}
