import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function SiteFooter() {
  const productLinks = [
    { name: "Unlock PDF", href: "/unlock" },
    { name: "Compress PDF", href: "/compress" },
    { name: "Protect PDF", href: "/protect" },
    { name: "All Tools", href: "/all-tools" },
  ];

  const resourceLinks = [
    { name: "How it Works", href: "#" },
    { name: "Security", href: "#" },
    { name: "License", href: "#" },
  ];

  return (
    <footer className="bg-slate-50 border-t">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <Button variant="ghost" className="p-0 h-auto text-sm text-slate-600 hover:text-primary">
                      {link.name}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <Button variant="ghost" className="p-0 h-auto text-sm text-slate-600 hover:text-primary">
                      {link.name}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-sm text-slate-600 mb-4">
              Built by Ved Khairnar, a Computer Science student focused on creating simple, 
              smart, and useful technology for everyone.
            </p>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-slate-600">
            © 2024 PDF Unlocker – Built by Ved Khairnar • MIT License
          </p>
        </div>
      </div>
    </footer>
  );
}