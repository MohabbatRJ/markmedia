import MarketingIndex from './pages/MarketingIndex/MarketingIndex';


import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Global/Navbar';
import AllCategory from './pages/CategoryPage/AllCategory';
import AllTags from './pages/TagsPage/AllTags';
import Footer from './components/Global/Footer'
import './assets/css/version/marketing.css'
import MarketingBlog from './pages/MarketingBlog/MarketingBlog';
import BlogsPage from './pages/BlogsPage/BlogsPage';
import Contact from './pages/ContactUs/Contact';
// import SinglePage from './components/SinglePage/SinglePage';
import SingleBlogPage from './pages/SingleBlogPage/SingleBlogPage';
import Scroll from './components/Scroll/Scroll';
// import { useEffect } from 'react';



function App() {

  return (
    <div id="wrapper">

      <Navbar />
      <Scroll>
        <Routes>
          <Route exact path='/' index element={<MarketingIndex />} />
          <Route exact path='/category/:slug' element={<AllCategory />} />
          {/* <Route exact path='/blog/marketing-blog' element={<MarketingBlog />} /> */}
          <Route exact path='/:slug' element={<BlogsPage />} />
          <Route exact path='/page/:slug' element={<Contact />} />
          <Route exact path='/singleblog/:slug' element={<SingleBlogPage />} />
          <Route exact path='/tags/:slug' element={<AllTags />} />
        </Routes>
      </Scroll>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
