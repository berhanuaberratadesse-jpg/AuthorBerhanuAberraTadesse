import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Post {
  id: string;
  title: string;
  category: string;
  link_url: string;
  created_at: string;
}

export function Courses() {
  const [courses, setCourses] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('category', 'course')
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setCourses(data);
      }
      setLoading(false);
    }
    
    fetchCourses();
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-slate-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-amber-400">Courses</h1>
        <p className="text-gray-300 mb-8 max-w-lg">Spiritual growth and Bible study courses by Berhanu Aberra Tadesse.</p>
        
        {loading ? (
          <p className="text-gray-400">Loading courses...</p>
        ) : courses.length === 0 ? (
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 text-center">
            <h2 className="text-2xl font-bold mb-4">No courses available yet</h2>
            <p className="text-gray-400">Check back soon for new educational content.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-slate-800/80 p-6 rounded-xl border border-slate-600 hover:border-amber-500/50 transition-colors shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-white">{course.title}</h3>
                <a 
                  href={course.link_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Access Course
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
