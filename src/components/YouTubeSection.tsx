import { Youtube } from 'lucide-react';

export function YouTubeSection() {
  return (
    <section id="videos" className="py-20 bg-slate-800/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full">
            <span className="text-amber-400 text-sm font-semibold flex items-center gap-2">
              <Youtube size={16} />
              Video Content
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Videos: True Light Highlights</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore inspiring video highlights from the True Light journey and ministry teachings.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-amber-500/20 aspect-video bg-slate-900">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/b_arH-hgo5Y"
                title="True Light Video 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl border border-amber-500/20 aspect-video bg-slate-900">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/98PR54TB9xo"
                title="True Light Video 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-700/60 p-8 rounded-xl shadow-lg border border-amber-500/20 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">About This Series</h3>
              <p className="text-gray-200 leading-relaxed mb-6">
                The True Light video playlist features inspiring moments from the author's spiritual journey, ministry teachings, and personal reflections on faith and transformation.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-amber-400 mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-white">Spiritual Insights</h4>
                    <p className="text-sm text-gray-300">Deep teachings on faith and personal growth</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-amber-400 mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-white">Personal Stories</h4>
                    <p className="text-sm text-gray-300">Journey of transformation and discovery</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-amber-400 mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-white">Ministry Teachings</h4>
                    <p className="text-sm text-gray-300">Biblical wisdom and practical guidance</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://www.youtube.com/playlist?list=PLITEme3CZeVm3UVzmylEX_0UT0hPKf734"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all transform hover:scale-105 shadow-lg"
            >
              <Youtube size={20} />
              View Full Playlist
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
