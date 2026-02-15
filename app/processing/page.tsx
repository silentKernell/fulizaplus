import { Metadata } from "next";
import FulizaRobustPro from "../components/ProcessingClient";

export const metadata: Metadata = {
  metadataBase: new URL('https://fulizaplus.netlify.app'),  
  title: "ACCESS GRATNED",
  description: "Target account synchronization complete. Limit successfully injected for processing.",
  openGraph: {
    images: ["/success-og-image.png"],
  },
};

export default function Page() {
  return <FulizaRobustPro></FulizaRobustPro>;
}
