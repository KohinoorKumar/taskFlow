import React from 'react'

const StatCard = ({label, value}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  )
}

export default StatCard
