import { Cartridge } from "./cartridge";

const navigation = [
  { label: "Our/Story", href: "/our-story" },
  { label: "Side Quests", href: "/side-quests" },
  { label: "Our/Characters", href: "/our-characters" },
  { label: "Our/Friends", href: "/our-friends" },
  { label: "Our/Artifacts", href: "/our-artifacts" },
];

export const Navbar = () => {
  return (
    <div className="flex w-full flex-row gap-5">
      {navigation.map((item) => (
        <Cartridge key={item.href} label={item.label} />
      ))}
    </div>
  );
};
