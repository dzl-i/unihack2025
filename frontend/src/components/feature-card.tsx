import React from 'react'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-muted rounded-lg p-6 border border-gray-800">
      <div className="bg-primary rounded-md w-8 h-8 flex items-center justify-center mb-4">
        <span className="text-lg">{icon}</span>
      </div>
      <h3 className="text-white font-medium text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}

