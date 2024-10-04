import Link from "next/link";
import Container from "../Container";
import Destination from "./Destination";
import { scholarship } from "@/utils/scholarship";
import UserMenu from "./UserMenu";
import HamburgurMenu from "./HamburgurMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";

const NavBar = async () => {
  const scholarshipsDestinations = Array.from(
    new Set(scholarship.map((item) => item.nation))
  );
  const currentUser = await getCurrentUser();

  return (
    <div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <div>
              <Link href="/">logo</Link>
            </div>
            <div className="">search</div>
            <div className="md:hidden block">
              <HamburgurMenu
                nations={scholarshipsDestinations}
                currentUser={currentUser}
              />
            </div>
            <div className="items-center gap-4 hidden md:flex">
              <div className="flex gap-8 md:gap-12 items-center">
                <Destination
                  scholarshipsDestinations={scholarshipsDestinations}
                />
                <div>Apply Now</div>
                <div>About Us</div>
                <div>Contact Us</div>
                <UserMenu currentUser={currentUser} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
