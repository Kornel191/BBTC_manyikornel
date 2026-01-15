<?php

namespace App\Http\Controllers;

use App\Models\Ugyfel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UgyfelController extends Controller
{
    public function index()
    {
        $ugyfel = Ugyfel::all();
        return response()->json($ugyfel);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nev' => 'required|string',
            'szulev' => 'required|string|min:1970',
            'irszam' => 'required|integer',
            'orsz' => 'required|string'
        ], [
            'nev' => [
                'required' => 'A név kitöltése kötelező',
                'string' => 'A név csak szöveg lehet',
            ],
            'szulev' => [
                'required' => 'A születési év kitöltése kötelező',
                'integer' => 'A születési év csak szám lehet',
                'min' => 'A születési év nem lehet kisebb 1970-nél'
            ],
            'irszam' => [
                'required' => 'Az irányítószám kitöltése kötelező',
                'integer' => 'Az irányítószám csak szám lehet'
            ],
            'orsz' => [
                'required' => 'Az ország kitöltése kötelező',
                'string' => 'Az ország csak szöveg lehet'
            ]
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Az adatok nem lómegfelelőek',
                'errors' => $validator->errors()->toArray()
            ], 422);
        }

        $newRecord = new Ugyfel();
        $newRecord->nev = $request->nev;
        $newRecord->szulev = $request->szulev;
        $newRecord->irszam = $request->irszam;
        $newRecord->orsz = $request->orsz;

        $newRecord->save();

        return response()->json(['success' => true, 'message' => 'Sikeres mentés'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $ugyfel = Ugyfel::find($id);
        if (!$ugyfel) {
            return response() -> json(["message" => "Nincs ilyen azonosítójú ügyfél"], 404);
        }
        $ugyfelBefizetesei = $ugyfel->befiz;

        return response() -> json($ugyfelBefizetesei);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ugyfel $ugyfel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ugyfel = Ugyfel::find($id);
        if (!empty($ugyfel)) {
            $ugyfel -> nev = $request->string("nev");
            $ugyfel -> szulev = $request->string("szulev");
            $ugyfel -> irszam = $request->string("irszam");
            $ugyfel -> orsz = $request->string("orsz");

            $ugyfel->save();
            return response() -> json(["message" => "Ügyfél módosítva", 202]);
        }
        else {
            return response() -> json(["message" => "Ügyfél nem található", 404]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ugyfel $ugyfel)
    {
        //
    }
}
