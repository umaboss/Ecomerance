import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ category }) => {
  return (
    <Link href={`/categories/${category.slug}`} passHref>
      <div className="relative group overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-[1.02] duration-300 cursor-pointer">
        <Image
          src={category.image}
          alt={category.name}
          width={400}
          height={300}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

        {/* Content */}
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold drop-shadow-sm mb-1">{category.name}</h3>
          <button className="flex items-center gap-1 text-sm text-white hover:text-primary-300 transition">
            Explore <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
