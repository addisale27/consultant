import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Scholarship Services</h3>
            <Link href="#">Scholarship Application Guidance</Link>
            <Link href="#">University Selection Assistance</Link>
            <Link href="#">Financial Aid Consulting</Link>
            <Link href="#">Personal Statement Writing</Link>
            <Link href="#">Interview Preparation</Link>
            <Link href="#">Visa and Immigration Advice</Link>
          </FooterList>

          <FooterList>
            <h3 className="text-base font-bold mb-2">Client Support</h3>
            <Link href="#">Contact Us</Link>
            <Link href="#">Application Process Guide</Link>
            <Link href="#">Scholarship Opportunities</Link>
            <Link href="#">Track Your Application</Link>
            <Link href="#">FAQs</Link>
          </FooterList>

          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">Our Mission</h3>
            <p className="mb-2">
              At our educational consultancy, we are dedicated to helping
              students navigate the scholarship application process. Our team
              offers expert guidance on selecting the right scholarships,
              preparing strong applications, and securing funding for your
              educational journey.
            </p>
            <p>
              &copy; {new Date().getFullYear()} BiruhTesfaEducational
              Consulting. All rights reserved!
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow us</h3>
            <div className="flex gap-2">
              <Link href="#">
                <MdFacebook size={24} />
              </Link>
              <Link href="#">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href="#">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="#">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
