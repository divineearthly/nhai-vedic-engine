#include <chrono>
#include <iostream>

int main()
{
    auto start=
    std::chrono::high_resolution_clock::now();

    for(long i=0;i<10000000;i++)
    {
        volatile double x=i*0.0001;
    }

    auto end=
    std::chrono::high_resolution_clock::now();

    auto ms=
    std::chrono::duration_cast<
    std::chrono::milliseconds>(
    end-start).count();

    std::cout<<"Inference Time: "
             <<ms
             <<" ms\n";
}
