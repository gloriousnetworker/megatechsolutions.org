import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useApi } from '../hooks/useApi';
import { api } from '../utils/api';
import { ErrorState } from '../components/ErrorState';
import { Skeleton } from '../components/ui/skeleton';
import type { GalleryItem } from '../types';

function GalleryGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-64 w-full rounded-lg" />
      ))}
    </div>
  );
}

export default function Gallery() {
  const { data: gallery, isLoading, error, retry } = useApi<GalleryItem[]>(() => api.gallery.list());
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'trainings', label: 'Trainings' },
    { value: 'workshops', label: 'Workshops' },
    { value: 'events', label: 'Events' },
    { value: 'graduation', label: 'Graduation' },
    { value: 'conferences', label: 'Conferences' }
  ];

  const allItems = gallery || [];
  const filteredGallery = activeCategory === 'all'
    ? allItems
    : allItems.filter(item => item.category === activeCategory);

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-xl text-blue-50 max-w-3xl">
            Explore moments from our training sessions, workshops, events, and celebrations
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading && <GalleryGridSkeleton />}
          {error && <ErrorState message={error} onRetry={retry} />}
          {!isLoading && !error && (
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full mb-8">
                {categories.map(cat => (
                  <TabsTrigger key={cat.value} value={cat.value}>
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={activeCategory}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGallery.map((item) => (
                    <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                        <div className="text-white">
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-200">{new Date(item.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {filteredGallery.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No items in this category yet</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>
    </div>
  );
}
