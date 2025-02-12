import { AlertCircle, Loader2, Upload } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { z } from 'zod';

import { AccountApi } from '@/api/account.api';
import { ProfileApi } from '@/api/profile.api';
import { useAuthStore } from '@/store/AuthStore/AuthStore';

import { useToast } from '@/hooks/useToast';

const FormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['owner', 'admin', 'user']),
  image: z
    .instanceof(File)
    .optional()
    .refine(file => !file || file.size < 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(
      file => !file || ['image/png', 'image/jpeg'].includes(file.type),
      'Only PNG or JPEG files allowed',
    ),
});

export type AccountFormData = z.infer<typeof FormSchema>;

interface AccountPageProps {
  initialData?: {
    fullName: string;
    email: string;
    role: 'owner' | 'admin' | 'user';
    image?: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
const roleOptions = [
  {
    label: 'Owner',
    value: 'owner',
  },
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'User',
    value: 'user',
  },
];

export function AccountPage({
  initialData = {
    fullName: 'John Doe',
    email: 'john@example.com',
    role: 'user' as const,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-02-01'),
  },
}: AccountPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(initialData.image);
  const { toast } = useToast();
  const { session, profile } = useAuthStore();

  const form = useForm<AccountFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: profile?.fullname || undefined,
      email: profile?.email,
      role: profile?.role,
    },
  });

  async function onSubmit(data: AccountFormData) {
    setIsLoading(true);
    try {
      if (session) {
        if (data.image) {
          const path = session.user.id + '/' + data.image.name;
          console.log(path);
          const imagedata = await AccountApi.uploadAccountImage(path, data.image);

          const up = await ProfileApi.updateProfile(session.user.id, {
            fullname: data.fullName,
            avatar: imagedata?.fullPath,
          });

          console.log('updated', up);
        }
      }
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        form.setValue('image', file);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!profile) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </Alert>
    );
  }

  const avatar = (import.meta.env.VITE_API_PROFILE_IMAGE_URL as string) + profile.avatar;
  return (
    <div className="mx-auto container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage your account information and preferences.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Account Image */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={imagePreview || avatar} />
                  <AvatarFallback className="text-4xl">
                    {initialData.fullName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="imageUpload"
                    onChange={handleImageChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('imageUpload')?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Change Photo
                  </Button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roleOptions.map(item => {
                            return (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Timestamps */}
              <div className="grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
                <div>
                  <p>Created At</p>
                  <p className="font-medium">{format(profile.created_at, 'PPP')}</p>
                </div>
                <div>
                  <p>Last Updated</p>
                  <p className="font-medium">{format(profile.updated_at, 'PPP')}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="ml-auto">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
