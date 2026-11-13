import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  variant = 'primary',
  size = 'default',
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon: Icon,
  ...props
}) {
  const baseClasses = "inline-flex items-center justify-center font-sans uppercase font-semibold text-center transition-all duration-300 ease-out select-none tracking-[0.12em] focus:outline-none focus:ring-1 focus:ring-text-primary";
  
  const sizeClasses = {
    sm: "text-[11px] px-5 py-2.5 rounded-[3px]",
    default: "text-[12px] px-8 py-4 rounded-[3px]",
    lg: "text-[13px] px-10 py-5 rounded-[3px]",
  };

  const variantClasses = {
    primary: "bg-text-primary text-canvas hover:bg-charcoal-hover active:bg-black shadow-sm disabled:opacity-50 disabled:cursor-not-allowed btn-shimmer",
    secondary: "bg-primary-accent text-text-primary border border-[rgba(30,27,24,0.08)] hover:bg-[#DDE7F1] active:bg-[#B8CFE4] shadow-sm disabled:opacity-50",
    tertiary: "bg-transparent text-text-primary border border-text-primary hover:bg-text-primary hover:text-canvas active:bg-charcoal-hover disabled:opacity-50",
    gold: "bg-gold-accent text-white hover:bg-[#A36D31] shadow-sm disabled:opacity-50 btn-shimmer",
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size] || sizeClasses.default} ${variantClasses[variant] || variantClasses.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClasses} {...props}>
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClasses}
      {...props}
    >
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {children}
    </button>
  );
}
