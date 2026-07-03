import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
}

export function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('category', 'blog')
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    }
    
    fetchPosts();
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-slate-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-amber-400">Writings & Blog</h1>
        
        {loading ? (
          <p className="text-gray-400">Loading posts...</p>
        ) : posts.length === 0 ? (
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 text-center">
            <h2 className="text-2xl font-bold mb-4">No posts yet</h2>
            <p className="text-gray-400">Check back soon for new writings and updates from Berhanu.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map(post => (
              <article key={post.id} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-sm text-gray-400 mb-4">{new Date(post.created_at).toLocaleDateString()}</p>
                <div className="text-gray-300 whitespace-pre-wrap">{post.content}</div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
