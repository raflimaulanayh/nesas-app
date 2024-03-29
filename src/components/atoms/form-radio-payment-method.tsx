import Image from 'next/image'
import { Control } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/atoms/ui/form'
import { Label } from '@/components/atoms/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/atoms/ui/radio-group'

interface RadioPaymentMethodInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any, unknown>
  name: string
  className?: string
  options?: {
    value: string
    label: string
    type: string
    codeArray?: string[]
  }[]
}

export const RadioPaymentMethodInput: React.FC<RadioPaymentMethodInputProps> = ({
  control,
  name,
  className,
  options,
  ...props
}) => {
  return (
    <FormField
      {...props}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => field.onChange(value)}
              defaultValue={field.value}
              className="flex flex-col w-full gap-0 space-y-0 border border-gray-300 divide-y divide-gray-300 rounded"
            >
              {options?.map((option, index) => (
                <FormItem className="flex flex-col w-full p-4 space-y-3" key={index}>
                  <div className="flex items-center space-x-3">
                    <FormControl>
                      <RadioGroupItem isEvent value={option.value} checked={field.value == option.value ? true : false} />
                    </FormControl>
                    <Label className="flex flex-col w-full">
                      <span className="font-medium">{option.label}</span>
                    </Label>
                  </div>
                  {option.codeArray && (
                    <div className="flex space-x-1">
                      {option.codeArray
                        ?.slice(0, 3)
                        .map((code, index) => (
                          <Image src={`/static/images/payment/${code}.png`} width={60} height={32} alt={code} key={index} />
                        ))}

                      {option.codeArray.length > 3 && (
                        <div className="w-[36px] h-[32px] border rounded border-gray-300 flex items-center justify-center text-xs font-medium">
                          {option.codeArray.length - 3}+
                        </div>
                      )}
                    </div>
                  )}
                </FormItem>
              ))}
              {/* <FormItem className="flex flex-col w-full p-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <FormControl>
                    <RadioGroupItem isEvent value="bni" checked={field.value == 'bni' ? true : false} />
                  </FormControl>
                  <Label className="flex flex-col w-full">
                    <span className="font-medium">Bank Transfer to BNI</span>
                  </Label>
                </div>
                <div className="flex flex-col space-y-3">
                  <p className="text-sm">You must send the copy of bank transfer receipt after paid in full.</p>
                  <div className="flex space-x-1">
                    <Image src="/static/images/payment/bni.png" width={60} height={32} alt="bni" />
                  </div>
                </div>
              </FormItem>
              <FormItem className="flex flex-col w-full p-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <FormControl>
                    <RadioGroupItem isEvent value="cc" checked={field.value == 'cc' ? true : false} />
                  </FormControl>
                  <Label className="flex flex-col w-full">
                    <span className="font-medium">Credit Card</span>
                  </Label>
                </div>
                <div className="flex flex-col space-y-3">
                  <div className="flex space-x-1">
                    <Image src="/static/images/payment/visa.png" width={60} height={32} alt="bni" />
                    <Image src="/static/images/payment/amex.png" width={60} height={32} alt="bni" />
                    <Image src="/static/images/payment/mastercard.png" width={60} height={32} alt="bni" />
                  </div>
                </div>
              </FormItem> */}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
