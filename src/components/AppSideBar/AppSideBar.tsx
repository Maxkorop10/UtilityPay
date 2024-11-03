import {
  Lightbulb,
  Smartphone,
  Globe,
  Tv,
  BadgePlus,
  DollarSign,
  CircleHelp,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/src/components/ui/sidebar';
import Link from 'next/link';

// Menu items.
const items = [
  {
    title: 'Комунальні платежі',
    url: '/utility-bills',
    icon: Lightbulb,
  },
  {
    title: "Мобільний зв'язок",
    url: '/mobile-network',
    icon: Smartphone,
  },
  {
    title: 'Інтернет',
    url: '/internet',
    icon: Globe,
  },
  {
    title: 'Телебачення',
    url: '/tv',
    icon: Tv,
  },
  {
    title: 'Замовити послугу',
    url: '/new-order',
    icon: BadgePlus,
  },
  {
    title: 'Заборгованості',
    url: '/debt',
    icon: DollarSign,
  },
  {
    title: 'Служба підтримки',
    url: '/support',
    icon: CircleHelp,
  },
];

export function AppSidebar() {
  return (
    <Sidebar
      side="left"
      variant="floating"
      collapsible="none"
      className="rounded-[10px] shadow-md h-fit max-w-fit mr-9"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="h-[370px] justify-between flex py-4 ">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center space-x-2"
                    >
                      <item.icon style={{ width: '24px', height: '24px' }} />
                      <span className="text-[20px]">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
