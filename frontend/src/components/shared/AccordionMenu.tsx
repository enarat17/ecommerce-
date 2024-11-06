import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "@/i18n/routing";

interface MenuItem {
  nameEn: string;
  nameAr: string;
  link: string;
}

interface AccordionMenuProps {
  menuName: string;
  items: MenuItem[];
  parentLink: string;
  rtl: boolean;
}

export default function AccordionMenu({ menuName, items, parentLink, rtl }: AccordionMenuProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={menuName}>
        <AccordionTrigger 
          className={`text-white hover:bg-unitedSecondary hover:text-unitedPrimary px-3 py-2 rounded-md text-sm font-medium transition-colors ${rtl ? 'text-right' : 'text-left'}`}
        >
          {menuName}
        </AccordionTrigger>
        <AccordionContent>
          <div className={`space-y-2 ${rtl ? 'pr-4' : 'pl-4'}`}>
            {items.map((item) => (
              <Link
                key={item.link}
                href={`${parentLink}/${item.link}`}
                className={`block text-white hover:bg-unitedSecondary hover:text-unitedPrimary px-3 py-2 rounded-md text-sm transition-colors ${rtl ? 'text-right' : 'text-left'}`}
              >
                {rtl ? item.nameAr : item.nameEn}
              </Link>
            ))}
            <Link
              href={parentLink}
              className={`block text-white hover:bg-unitedSecondary hover:text-unitedPrimary px-3 py-2 rounded-md text-sm font-medium transition-colors ${rtl ? 'text-right' : 'text-left'}`}
            >
              {rtl ? 'المزيد' : 'Show More'}
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
