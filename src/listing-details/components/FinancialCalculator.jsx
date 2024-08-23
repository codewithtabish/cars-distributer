import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const FinancialCalculator = ({ carDetails }) => {
  const [price, setPrice] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const { toast } = useToast();

  const calculateMonthlyPayment = () => {
    const principal = price - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;

    const payment =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    setMonthlyPayment(payment.toFixed(2));
    if (payment) {
      toast({
        title: "Calculation Successful 🔥🔥",
        description: `Your estimated monthly payment is $${payment.toFixed(
          2
        )}.`,
      });
    }
  };

  return (
    <div className="w-[90%] border p-5 shadow-sm rounded-xl mt-7">
      <h2 className="text-xl font-primaryBold py-4 mb-5">Pricing Calculator</h2>
      <div className="flex flex-row gap-4">
        <div className="flex-1">
          <h2 className="font-primaryRegular my-1 text-gray-600  text-sm font-bold">
            Price $ <span className="">*</span>
          </h2>
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Enter price"
          />
        </div>
        <div className="flex-1">
          <h2 className="font-primaryRegular text-sm text-gray-600  font-bold my-1">
            Interest Rate % <span className="text-red-400">*</span>
          </h2>
          <Input
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            type="number"
            placeholder="Enter interest rate"
          />
        </div>
      </div>
      <div className="flex flex-row gap-4 mt-5">
        <div className="flex-1">
          <h2 className="font-primaryRegular my-1 text-sm text-gray-600  font-bold">
            Loan Term (months) <span className="">*</span>
          </h2>
          <Input
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            type="number"
            placeholder="Enter loan term"
          />
        </div>
        <div className="flex-1">
          <h2 className="font-primaryRegular text-sm font-bold text-gray-600  my-1">
            Down Payment $ <span className="text-red-400">*</span>
          </h2>
          <Input
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            type="number"
            placeholder="Enter down payment"
          />
        </div>
      </div>
      <Button
        className="w-full bg-helper mt-4"
        onClick={calculateMonthlyPayment}
      >
        Calculate
      </Button>
      {/* {monthlyPayment && (
        <div className="mt-5">
          <h3 className="text-xl font-primaryBold">
            Estimated Monthly Payment: ${monthlyPayment}
          </h3>
        </div>
      )} */}
    </div>
  );
};

export default FinancialCalculator;
