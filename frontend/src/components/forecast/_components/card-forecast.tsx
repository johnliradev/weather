import React from "react";

interface CardProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  icon?: React.ReactNode;
}
export const CardForecast: React.FC<CardProps> = ({
  title,
  content,
  footer,
  icon,
}) => (
  <div className="rounded border border-zinc-300 bg-white px-6 py-5 flex flex-col justify-between min-h-[140px]">
    {(title || icon) && (
      <div className="flex justify-between items-center">
        {title && (
          <span className="font-medium text-zinc-500 text-sm flex items-center gap-1">
            {title}
          </span>
        )}
        {icon && icon}
      </div>
    )}
    {content && <div className="mt-2 text-4xl font-bold">{content}</div>}
    {footer && (
      <div className="mt-1 text-zinc-400 font-medium text-sm">{footer}</div>
    )}
  </div>
);
