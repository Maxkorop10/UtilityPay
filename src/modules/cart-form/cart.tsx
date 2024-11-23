// import Utility from "@/src/modules/utility-service/utility";
// import { Zap, Droplet } from 'lucide-react';
// import { Button } from "@/src/components/ui/button";

// export default function CartPage() {
//   const utilities = [
//     {
//       Icon: Zap,
//       utility_name: "Електроенергія",
//       used_value: "200 кВт",
//       price: 400,
//     },
//     {
//       Icon: Droplet,
//       utility_name: "Вода",
//       used_value: "15 м³",
//       price: 150,
//     },
//   ];

//   const totalPrice = utilities.reduce((sum, utility) => sum + utility.price, 0);

//   return (
//     <div className="rounded-[10px] shadow-md h-fit w-[100%] p-4 bg-white">
//       <p className="font-bold text-2xl">Кошик</p>
//       <div className="mt-4">
//         {utilities.map((utility, index) => (
//           <Utility
//             key={index}
//             Icon={utility.Icon}
//             utility_name={utility.utility_name}
//             used_value={utility.used_value}
//             price={`${utility.price}`}
//           />
//         ))}
//       </div>
//       <div className="flex justify-between items-center mt-6 border-t pt-4">
//         <p className="font-bold text-lg">Загальна сума: {totalPrice} грн.</p>
//         <Button className="bg-green-500 text-white rounded px-6 py-2">
//           Оплатити все
//         </Button>
//       </div>
//     </div>
//   );
// }