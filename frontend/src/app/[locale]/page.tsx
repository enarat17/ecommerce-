"use client";
import NavigtionWrapper from "@/components/shared/NavigationWrapper";
import Footer from "@/components/shared/Footer";
import Introduction from "@/components/shared/LandingPage/Introduction";
import RecentBlogs from "@/components/shared/LandingPage/RecentBlogs";
import FeaturedConsults from "@/components/shared/LandingPage/FeaturedConsults";
import FeaturedProducts from "@/components/shared/LandingPage/FeaturedProducts";
import OurFeatures from "@/components/shared/LandingPage/OurFeatures";
import ClientsSection from "@/components/shared/LandingPage/ClientsSection";
import axios from "axios";
import { Blog } from "@/components/types/BlogTableColumns";
import { Consultation } from "@/components/types/ConsultationTableColumns";
import { Product } from "@/components/types/ProductTableColumns";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import {
  fetchLandingPageData,
  fetchLandingPageContent,
} from "@/lib/api/generalRequests";
import { usePathname } from "next/navigation";
import PDFFlipbook from "@/components/shared/PdfFlipBook";

const info = {
  ar_info : 'أُسس مكتب المتحدون للإستشارات المالية والإدارية ليكون أحد المكاتب الفريدة والمتخصصة في مجال الإستشارات المالية والإدارية وذلك لإعتمادة على عدة أسس ومبادئ من أصول وعماد مهنة الإستشارات المالية والإدارية ، فنحن على خلاف معظم مكاتب الإستشارات لا نعتمد في عملنا على المتعاونين من المستشارين ولا نُسند أعمالنا لمساعدين خارجيين ، فقد إعتمدنا على إستقطاب أمهر المستشارين المتخصصين والمتعمقين في كافة وكامل ما نقدمه من خدمات ، ليكونوا هم النواه والعماد الرئيسي لنشأة المكتب. وإتحاد هذه النخبة من المتخصصين في مجال الإستشارات التجارية ، والمالية والإدارية ، والزكاه والضريبة والقوائم المالية وأعمال المراجعة الداخلية والخارجية ، والحوكمة والإدراج في هيئة سوق المال ، كان هو القوام الرئيسي لمكتبنا ، وقد رأينا أننا بهذا التمتع من القدر الكبير من الخبرة والعمق والتخصص ، نقدم خدمة لا نظير لها وغير مسبوقه من أي مكتب إستشارات ، فنحن بذلك نقدم خدمه متميزه تنافسية وفي نفس الوقت وعلى الجانب الآخر كان هدفنا الرئيسي هو تقديم الإستفاده الكامله للعميل ، وحمايته من أي تعاقدات قد لا تكون على نفس إحتياجه '
  ,en_info:'The United Office for Financial and Administrative Consulting was established to be one of the unique and specialized offices in the field of financial and administrative consultancy because it is based on several foundations and principles of the origins and pillars of the financial and administrative consulting profession. Unlike most consulting offices, we do not rely on collaborators of consultants and do not assign our work to external assistants, we have relied on attracting the most skilled specialized and in-depth consultants in all and all the services we provide, to be the nucleus and the main pillar of the establishment of the office. The union of this elite group of specialists in the field of commercial, financial and administrative consulting, zakat, taxation, financial statements, internal and external audits, governance and listing in the Capital Market Authority, was the main strength of our office, and we saw that we enjoy this great amount of experience, depth and specialization. We provide an unparalleled and unprecedented service from any consulting office, we thus provide a distinctive and competitive service and at the same time and on the other side our main goal was to provide full benefit to the client, and protect him from any contracts that may not be on the same need or expose him to perform work that he does not benefit from and spend his money with no return or benefit.',
  ar_vision:'نتطلع نحن في مكتب المتحدون للإستشارات المالية والإدارية إلى الإنتشار في معظم مدن المملكة وذلك بعد تحقيق معدل إنتشار معقول في مدينة الرياض وذلك بفضل ما لدينا من خبرات متميزة في مجال الإستشارات المالية والإدارية. نحن نشعر أننا الأفضل في هذا المجال لذلك نتطلع لتحقيق أكبر إستفاده لعملاؤنا بما لدينا من خبرات ممتيزة.',
  en_vision:'We at United Office for Financial and Administrative Consulting are looking forward to spreading to most cities in the Kingdom after achieving a reasonable rate of spread in Riyadh, thanks to our distinguished expertise in the field of financial and administrative consulting. We feel that we are the best in this field, so we look forward to achieving the greatest benefit for our clients with our excellent expertise.'
}
export default function Home() {
  const pathname = usePathname();
  const isRtl = pathname.startsWith("/ar");

  const {
    data: content,
    isLoading,
    isError,
    isFetched: contentFetched,
  } = useQuery({
    queryKey: ["landingContent"],
    queryFn: fetchLandingPageContent,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
  const { data: data, isFetched } = useQuery({
    queryKey: ["landingPage"],
    queryFn: fetchLandingPageData,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });

  return (
    <>
      <NavigtionWrapper />
      <main>
        {isFetched && contentFetched && (
          <>
            {isRtl ? (
              <>
                <Introduction
                  locale="ar"
                  text={info.ar_info}
                  image={content.image}
                />
                {/* <OurFeatures locale='ar' features={content.services} /> */}
                {/* <FeaturedConsults consults={data.consults} locale='ar' />
            <FeaturedProducts products={data.bestSellingProducts}  locale='ar'/> */}
              </>
            ) : (
              <>
                <Introduction
                  locale="en"
                  text={info.en_info}
                  image={content.image}
                />
                {/* <OurFeatures locale='en' features={content.services}  /> */}
                {/* <FeaturedConsults consults={data.consults} locale='en' />
            <FeaturedProducts products={data.bestSellingProducts}  locale='en' /> */}
              </>
            )}
            {/* <RecentBlogs blogs={data.recentBlogs}/> */}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
