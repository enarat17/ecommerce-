import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from './ui/button';
import ReviewDialog from './ReviewDialog';
import { Review } from '@/components/types/Review';
import { useQuery } from '@tanstack/react-query';
import { getProductReviews } from '@/lib/api/productsApi';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserContext } from "@/lib/Providers/UserProvider";

interface ReviewSectionProps {
  id: string;
}

export default function ReviewSection({ id }: ReviewSectionProps) {
  const [visibleReviews, setVisibleReviews] = useState(6);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useUserContext();

  const { data: reviews, isFetched, isLoading } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => getProductReviews(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);
  const handleShowMore = () => setVisibleReviews((prev) => prev + 10);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 md:w-5 md:h-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const reviewsToShow = reviews?.filter((review: Review) => review.review).slice(0, visibleReviews) || [];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='bg-white shadow-lg rounded-lg my-8 p-6'
    >
      <div className="w-[70vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0 text-gray-800">Customer Reviews</h2>
          {user && (
            <Button 
              className="px-4 py-2 bg-unitedPrimary text-white rounded-full hover:bg-unitedPrimary/85 transition-colors duration-300" 
              onClick={handleOpenDialog}
            >
              Add a Review
            </Button>
          )}
        </div>
        <ReviewDialog Id={id} isOpen={dialogOpen} onClose={handleCloseDialog} type='product' />
        
        {isLoading ? (
          <div className="text-center text-gray-600">Loading reviews...</div>
        ) : reviewsToShow.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="mb-4">No reviews available yet.</p>
            {user && (
              <Button 
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors duration-300" 
                onClick={handleOpenDialog}
              >
                Be the first to review
              </Button>
            )}
          </div>
        ) : (
          <AnimatePresence>
            <motion.div 
              className="flex gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {reviewsToShow.map((review: Review, index: number) => (
                <motion.div 
                  key={index}
                  className="p-4 border border-gray-200 w-[400px] h-[150px] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <p className='text-unitedPrimary font-semibold'>{review.user.name}</p>
                  <div className="flex items-center my-2">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-700 text-sm md:text-base">{review.review}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
        
        {visibleReviews < (reviews?.length || 0) && (
          <motion.div 
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors duration-300"
              onClick={handleShowMore}
            >
              Show More
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}