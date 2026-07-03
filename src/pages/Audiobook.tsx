import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Post {
  id: string;
  title: string;
  category: string;
  link_url: string;
  created_at: string;
}

export function Audiobook() {
  const [audiobooks, setAudiobooks] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAudiobooks() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('category', 'audiobook')
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setAudiobooks(data);
      }
      setLoading(false);
    }
    
    fetchAudiobooks();
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-slate-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-amber-400">Audiobook</h1>
        <p className="text-gray-300 mb-8 max-w-lg">Listen to the audio version of True Light.</p>
        
        {loading ? (
          <p className="text-gray-400">Loading audiobooks...</p>
        ) : audiobooks.length === 0 ? (
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 text-center">
            <h2 className="text-2xl font-bold mb-4">No audiobooks available yet</h2>
            <p className="text-gray-400">We are currently producing the audio version of True Light. Stay tuned!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {audiobooks.map(audiobook => (
              <div key={audiobook.id} className="bg-slate-800/80 p-6 rounded-xl border border-slate-600 hover:border-amber-500/50 transition-colors shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-white">{audiobook.title}</h3>
                <a 
                  href={audiobook.link_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg transition-colors flex gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
                  Listen Now
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
