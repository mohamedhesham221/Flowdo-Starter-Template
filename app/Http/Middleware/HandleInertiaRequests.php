<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = '{"id":1,"email":"user@example.com","remember_token":"JWEmZvU90TlLb4jhov3ATTDya126eVXuFbyOMX5Wwn7cWfDg7cwQq4HPMjxq","created_at":"2023-08-28T09:02:27+00:00","updated_at":"2024-05-23T16:41:22+00:00","user":{"id": 1,"company_id": 8,"user_auth_id": 12,"name": "مدير النظام","email": "user@example.com","image_url": "'.url('/').'7a37a4bd0b130ba245c6cfb82a5f7567.png","employee_detail": {"id": 13,"company_id": 8,"user_id": 17,"employee_id": "01","designation": {"name": "مدير إدارة"},"department": {"team_name": "الإدارة التنفيذية"}}}}';

        // \Illuminate\Support\Facades\Log::info(json_decode($user));
        return [
            ...parent::share($request),
            'auth' => [
                'user' => json_decode($user),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'locale' => fn() => app()->getLocale(),
            'app' => [
                'name' => "شركة تجريبية",
                'logo' => url('/') . "/logo.png",
            ],
        ];
    }
}
