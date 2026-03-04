interface StarRatingProps {
    rating: number;
    maxRating?: number;
    size?: number; // size in pixels
}

const StarIcon = ({ size, color }: { size: number; color: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        stroke="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
    </svg>
);

export const StarRating = ({ 
    rating, 
    maxRating = 5, 
    size = 20, 
}: StarRatingProps) => {

    return (
        <div className="flex items-center">
            {[...Array(maxRating)].map((_, index) => {
                const starIsFilled = index < Math.floor(rating);
                return (
                    <StarIcon
                        key={index}
                        size={size}
                        color={starIsFilled ? '#FFC107' : '#E0E0E0'}
                    />
                );
            })}
        </div>
    );
};
