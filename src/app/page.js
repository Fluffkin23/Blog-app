import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/layout/Header";
import BlogList from "./components/ui/BlogList";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <BlogList></BlogList>
      <Footer></Footer>
    </div>
  );
}
