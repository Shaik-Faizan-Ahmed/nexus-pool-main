import { Link } from "react-router-dom";
import { Zap, Github, Twitter, Linkedin, Mail, Shield, FileText } from "lucide-react";
import { socialLinks } from "@/data/mockData";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: "Assets", href: "/assets" },
      { label: "Bids", href: "/bids" },
      { label: "Campaigns", href: "/campaigns" },
      { label: "DAOs", href: "/groups" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
    support: [
      { label: "Help Center", href: "/help" },
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/api-reference" },
      { label: "Status", href: "/status" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Security", href: "/security" },
    ],
  };

  const socialIcons = [
    { icon: Github, href: socialLinks.github, label: "GitHub" },
    { icon: Twitter, href: socialLinks.twitter, label: "Twitter" },
    { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${socialLinks.email}`, label: "Email" },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Zap className="h-8 w-8 text-primary" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                ChainFund
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 max-w-sm">
              Decentralized pool funding and DAO-backed asset trading platform. 
              Empowering communities to invest, trade, and govern together.
            </p>
            <div className="flex space-x-3">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>© {currentYear} ChainFund. All rights reserved.</span>
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span>Secured by blockchain</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Link to="/status" className="hover:text-foreground transition-colors">
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 bg-accent rounded-full" />
                <span>All systems operational</span>
              </div>
            </Link>
            <Link 
              to="/docs" 
              className="flex items-center space-x-1 hover:text-foreground transition-colors"
            >
              <FileText className="h-4 w-4" />
              <span>API Docs</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}