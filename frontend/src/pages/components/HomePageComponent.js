import ProductCarouselComponent from "../../components/ProductCarouselComponent";
import CategoryCard from "../../components/CategoryCardComponent";
import CategoryGrid from "../../components/CategoryGrid";
import HeroSection from "../../components/HeroSection";
import { Row, Container } from "react-bootstrap";
import { LanguageContext } from "../../context/LanguageContext";
import { useEffect, useState ,useContext} from "react";
import MetaComponent from "../../components/MetaComponent";
import Partners from "../../components/Parteners";
import FeaturesSection from "../../components/Features";

const HomePageComponent = ({ categories, getBestsellers }) => {

    const [mainCategories, setMainCategories] = useState([]);
    const [bestSellers, setBestsellers] = useState([]);
    const [error, setError] = useState('');
    const { language } = useContext(LanguageContext);

    function onCategoryClick(categoryName) {
        window.location.href = `product-list/category/${categoryName}`;
    }
    useEffect(() => {
        getBestsellers()
        .then((data) => {
            setBestsellers(data);
        })
        .catch((er) => {
            setError(er.response.data.message ? er.response.data.message : er.response.data)
           console.log(er.response.data.message ? er.response.data.message : er.response.data) 
        });
        setMainCategories((cat) => categories.filter((item) => !item.name.includes("/")));
    }, [categories, getBestsellers])

  return (
    <>
      <MetaComponent />
      <HeroSection language={language} />
      <ProductCarouselComponent bestSellers={bestSellers} />
      {/* <Container>
        <Row xs={1} md={2} className="g-4 mt-5">
          {mainCategories.map((category, idx) => (
            <CategoryCardComponent key={idx} category={category} idx={idx} />
          ))}
        </Row>
        {error}
      </Container> */}
      <CategoryGrid categories={mainCategories} language={language} onCategoryClick={onCategoryClick} /> 
      <Partners language={language} /> 
      <FeaturesSection language={language} />
    </>
  );
};

export default HomePageComponent;
