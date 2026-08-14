import Header from "@layouts/headers/Index";
import Footer from "@layouts/footers/Index";
import WhatsAppButton from "@components/WhatsAppButton";

export const revalidate = 300;

const PagesLayouts = ({
  children
}) => {
  return (
    <>
      <Header layout={"default"} />

      {/* dynamic content */}
      {children} 
      {/* dynamic content end */}
      
      <Footer layout={"default"} />
      <WhatsAppButton />
    </>
  );
};
export default PagesLayouts;
