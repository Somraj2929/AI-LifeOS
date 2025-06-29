import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function HowItWorks() {
  return (
    <section className="p-4">
      <hr className="mb-4 mt-2 border-gray-400" />
      <div className="flex items-center mb-2">
        <h2 className="font-bold text-black text-xl mr-1">How it works..</h2>
        <InformationCircleIcon className="h-5 w-5 text-gray-700" />
      </div>
      <ul className="list-disc list-inside text-sm text-gray-800 space-y-2 p-2">
        <li>
          <span className="font-bold">Data Analysis:</span> It gathers and
          processes vast amounts of relevant data associated with each option
          (e.g., historical performance, cost, risk factors).
        </li>
        <li>
          <span className="font-bold">Criteria &amp; Objectives:</span> It
          evaluates each option against predefined criteria and objectives
          (e.g., maximize profit, minimize risk, save time), which are often
          weighted by human input.
        </li>
        <li>
          <span className="font-bold">Model Application:</span> Using various AI
          models, it identifies patterns, predicts outcomes, and scores/ranks
          each option.
        </li>
        <li>
          <span className="font-bold">Selection &amp; Output:</span> It then
          selects the &quot;best&quot; option based on these scores and rules,
          often providing explanations for its choice.
        </li>
      </ul>
    </section>
  );
}
