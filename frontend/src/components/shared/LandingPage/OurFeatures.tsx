import Image from "next/image";
import { Users, CheckCircle, Star, Rocket, Zap, Shield, Target, Headphones } from 'lucide-react';

interface Feature {
  icon: string;
  title_EN: string;
  title_AR: string;
  description_EN: string;
  description_AR: string;
}

interface OurFeaturesProps {
  locale: string;
  features: Feature[];
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Users: Users,
  CheckCircle: CheckCircle,
  Star: Star,
  Rocket: Rocket,
  Zap: Zap,
  Shield: Shield,
  Target: Target,
  Headphones: Headphones
}
export default function OurFeatures({ locale, features }: OurFeaturesProps) {
  const isRTL = locale === 'ar';

  const text = {
    title: isRTL ? 'مميزاتنا' : 'Our Features',
    summary: isRTL
      ? 'نقدم خدمات متميزة من خلال فريق متخصص، مع التركيز على الجودة ورضا العملاء، ونلعب دورًا فعالًا في نجاح عملائنا.'
      : 'We offer exceptional services through a specialized team, focusing on quality and customer satisfaction, playing an effective role in our clients success.'
  };

  return (
    <section className={`p-4 bg-unitedPrimary rounded-xl flex flex-col items-center w-full  ${isRTL ? 'rtl' : 'ltr'}`}>
      <h1 className="text-3xl font-semibold mb-4 text-white w-full text-center">{text.title}</h1>
      <p className="text-xl text-slate-200/90 max-w-3xl text-center mb-8">{text.summary}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 w-full max-w-6xl">
        {features.map((feature, index) => {
          const Icon = iconMap[feature.icon];
          return (
            <div key={index} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:bg-slate-100">
              {Icon && <Icon size={48} className="text-unitedPrimary mb-4" />}
              <h2 className="text-xl font-semibold text-unitedPrimary w-full text-center mb-2">
                {isRTL ? feature.title_AR : feature.title_EN}
              </h2>
              <p className="text-gray-600 text-center">
                {isRTL ? feature.description_AR : feature.description_EN}
              </p>
            </div>
          );
        })}
      </div>    </section>
  );
}
