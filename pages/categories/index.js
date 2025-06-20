import Layout from '../../components/Layout';
import CategoryCard from '../../components/CategoryCard';
import { categories } from '../../lib/data';

const Categories = () => {
  return (
    <Layout title="Categories - Genroar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our diverse range of categories and find exactly what you're looking for. 
            From electronics to fashion, we have everything you need.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;